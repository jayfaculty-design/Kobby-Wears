const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
  console.error("SECRET_KEY environment variable is not set!");
  process.exit(1); // Exit if critical config is missing
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://kobby-wears.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

const pool = new Pool({
  // user: "postgres",
  // host: "localhost",
  // database: "kobby-wears",
  // password: "facultyf",
  // port: 5432,
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_DATABASE,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
  // Web connection starts here
  ssl: { rejectUnauthorized: false },
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Get user's cart
app.get("/cart", authenticateToken, async (req, res) => {
  try {
    // Check if user has a cart
    let cartResult = await pool.query(
      "SELECT id FROM carts WHERE user_id = $1",
      [req.user.id]
    );

    // If no cart exists, create one
    if (cartResult.rows.length === 0) {
      cartResult = await pool.query(
        "INSERT INTO carts (user_id) VALUES ($1) RETURNING id",
        [req.user.id]
      );
    }

    const cartId = cartResult.rows[0].id;

    // Get cart items with product details
    const cartItemsResult = await pool.query(
      `SELECT ci.id, ci.quantity, ci.size, ci.color, p.id as product_id, p.name, p.price, p.img_url
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.cart_id = $1`,
      [cartId]
    );

    res.json(cartItemsResult.rows);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({
      error: "Error fetching cart",
      message: error.message,

      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

// Add item to cart
app.post("/cart/items", authenticateToken, async (req, res) => {
  const { product_id, quantity, size, color } = req.body;

  try {
    // Get or create cart
    let cartResult = await pool.query(
      "SELECT id FROM carts WHERE user_id = $1",
      [req.user.id]
    );

    if (cartResult.rows.length === 0) {
      cartResult = await pool.query(
        "INSERT INTO carts (user_id) VALUES ($1) RETURNING id",
        [req.user.id]
      );
    }

    const cartId = cartResult.rows[0].id;

    // Check if item already exists
    const existingItem = await pool.query(
      "SELECT id, quantity FROM cart_items WHERE cart_id = $1 AND product_id = $2 AND size = $3 AND color = $4",
      [cartId, product_id, size, color]
    );

    if (existingItem.rows.length > 0) {
      // Update quantity
      await pool.query(
        "UPDATE cart_items SET quantity = quantity + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2",
        [quantity, existingItem.rows[0].id]
      );
    } else {
      // Insert new item
      await pool.query(
        "INSERT INTO cart_items (cart_id, product_id, quantity, size, color) VALUES ($1, $2, $3, $4, $5)",
        [cartId, product_id, quantity, size || "One Size", color || "Default"]
      );
    }

    res.status(201).send("Item added to cart");
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).send("Error adding item to cart");
  }
});

// Update cart item quantity
app.put("/cart/items/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    // Verify the cart item belongs to user's cart
    const cartCheck = await pool.query(
      `SELECT ci.id FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.id
       WHERE ci.id = $1 AND c.user_id = $2`,
      [id, req.user.id]
    );

    if (cartCheck.rows.length === 0) {
      return res.status(404).send("Cart item not found");
    }

    if (quantity > 0) {
      await pool.query(
        "UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2",
        [quantity, id]
      );
    } else {
      await pool.query("DELETE FROM cart_items WHERE id = $1", [id]);
    }

    res.send("Cart updated");
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).send("Error updating cart");
  }
});

// Remove item from cart
app.delete("/cart/items/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    // Verify the cart item belongs to user's cart
    const cartCheck = await pool.query(
      `SELECT ci.id FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.id
       WHERE ci.id = $1 AND c.user_id = $2`,
      [id, req.user.id]
    );

    if (cartCheck.rows.length === 0) {
      return res.status(404).send("Cart item not found");
    }

    await pool.query("DELETE FROM cart_items WHERE id = $1", [id]);

    res.send("Item removed from cart");
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).send("Error removing item");
  }
});

// Clear cart
app.delete("/cart", authenticateToken, async (req, res) => {
  try {
    const cartResult = await pool.query(
      "SELECT id FROM carts WHERE user_id = $1",
      [req.user.id]
    );

    if (cartResult.rows.length > 0) {
      await pool.query("DELETE FROM cart_items WHERE cart_id = $1", [
        cartResult.rows[0].id,
      ]);
    }

    res.send("Cart cleared");
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).send("Error clearing cart");
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters" });
  }
  try {
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword]
    );
    res.json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error registering user: ", error);
    res.status(500).send("Error registering user");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (result.rows.length === 0) {
      return res.status(400).send("User not found");
    }
    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).send("Invalid password");
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).send("Error logging in");
  }
});

app.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

app.get("/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error fetching products");
  }
});

// Route to fetch user profile
app.get("/profile", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT username FROM users WHERE id = $1",
      [req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).send("Error fetching profile");
  }
});

// Route to update user profile
app.put("/profile", authenticateToken, async (req, res) => {
  const { username } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET username = $1 WHERE id = $2 RETURNING username",
      [username, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("Error updating profile");
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to the shopping app backend!");
});

// app.get("/products", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM products");
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).send("Error fetching products");
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
