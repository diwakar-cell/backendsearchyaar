/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: APIs for user authentication
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: Pass@123
 *               gender:
 *                 type: string
 *                 example: male
 *               mobile:
 *                 type: string
 *                 example: 9876543210
 *               type:
 *                 type: string
 *                 enum: [normal, google, facebook, apple]
 *                 example: normal
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or missing fields
 *       409:
 *         description: Email already exists
 */
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login an existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: Pass@123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Send OTP to user email for password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Invalid email or user not found
 */

/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP during password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               otp:
 *                 type: string
 *                 example: 1111
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid or expired OTP
 */

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset user password after OTP verification
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               newPassword:
 *                 type: string
 *                 example: NewPass@123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Failed to reset password
 */

/**
 * @swagger
 * /api/auth/send-otp:
 *   post:
 *     summary: Otp send to an existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       401:
 *         description: Invalid credentials
 */


/**
 * @swagger
 * /api/auth/update/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe Updated
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: NewPass@123
 *               gender:
 *                 type: string
 *                 example: male
 *               mobile:
 *                 type: string
 *                 example: 9876543210
 *               type:
 *                 type: string
 *                 enum: [normal, google, facebook, apple]
 *                 example: normal
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Validation error or missing fields
 *       404:
 *         description: User not found
 */