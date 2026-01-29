/**
 * @swagger
 * tags:
 *   name: Service Listing
 *   description: APIs for creating and managing service listings
 */

/**
 * @swagger
 * /api/service/service-listing:
 *   post:
 *     summary: Create a new service listing with media
 *     tags: [Service Listing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service_title
 *               - service_type
 *               - type
 *               - sub_type
 *               - business_name
 *               - contact_number
 *               - email
 *               - state
 *               - city
 *               - full_address
 *               - price_type
 *               - price_amount
 *             properties:
 *               service_title:
 *                 type: string
 *                 example: Bridal Makeup
 *               service_type:
 *                 type: string
 *                 example: Salon
 *               type:
 *                 type: string
 *                 example: Makeup Artist
 *               sub_type:
 *                 type: string
 *                 example: artist
 *               description:
 *                 type: string
 *                 example: Premium bridal makeup services
 *               business_name:
 *                 type: string
 *                 example: Blackbird Salon
 *               contact_number:
 *                 type: string
 *                 example: +919876543210
 *               email:
 *                 type: string
 *                 example: blackbirdsalon@gmail.com
 *               state:
 *                 type: string
 *                 example: Rajasthan
 *               city:
 *                 type: string
 *                 example: Jaipur
 *               full_address:
 *                 type: string
 *                 example: 2nd Floor, Pink City Plaza, MI Road
 *               price_type:
 *                 type: string
 *                 enum: [Fixed, Hourly, Package]
 *                 example: Fixed
 *               price_amount:
 *                 type: number
 *                 example: 12999
 *               opening_time:
 *                 type: string
 *                 example: "10:00"
 *               closing_time:
 *                 type: string
 *                 example: "20:00"
 *               media:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     urls:
 *                       type: string
 *                       example: https://example.com/image1.jpg
 *                     description:
 *                       type: string
 *                       example: Bridal makeup look
 *     responses:
 *       201:
 *         description: Service listing created successfully
 *       400:
 *         description: Validation error or missing fields
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/service/service-listing/{id}:
 *   put:
 *     summary: Update an existing service listing with media
 *     tags: [Service Listing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Service listing ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_title:
 *                 type: string
 *                 example: Bridal Makeup Updated
 *               service_category:
 *                 type: string
 *                 example: Salon
 *               service_type:
 *                 type: string
 *                 example: Makeup Artist
 *               description:
 *                 type: string
 *               business_name:
 *                 type: string
 *               contact_number:
 *                 type: string
 *               email:
 *                 type: string
 *               state:
 *                 type: string
 *               city:
 *                 type: string
 *               full_address:
 *                 type: string
 *               price_type:
 *                 type: string
 *                 enum: [Fixed, Hourly, Package]
 *               price_amount:
 *                 type: number
 *               opening_time:
 *                 type: string
 *                 example: "09:00"
 *               closing_time:
 *                 type: string
 *                 example: "21:00"
 *               media:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     urls:
 *                       type: string
 *                       example: https://example.com/new1.jpg
 *                     description:
 *                       type: string
 *     responses:
 *       200:
 *         description: Service listing updated successfully
 *       404:
 *         description: Service listing not found
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/service/service-listing/{id}:
 *   delete:
 *     summary: Delete a service listing by ID
 *     tags: [Service Listing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Service listing ID
 *     responses:
 *       200:
 *         description: Service listing deleted successfully
 *       404:
 *         description: Service listing not found
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/service/service-listing:
 *   get:
 *     summary: Get all service listings with media
 *     tags: [Service Listing]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of records per page
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           example: Salon
 *         description: Filter by type
 *       - in: query
 *         name: sub_type
 *         schema:
 *           type: string
 *           example: Salon
 *         description: Filter by sub type
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *           example: Rajasthan
 *         description: Filter by state
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *           example: Jaipur
 *         description: Filter by city
 *     responses:
 *       200:
 *         description: Service listings fetched successfully
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/service/service-listing/{id}:
 *   get:
 *     summary: Get service listing details by ID
 *     tags: [Service Listing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Service listing ID
 *     responses:
 *       200:
 *         description: Service listing fetched successfully
 *       404:
 *         description: Service listing not found
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/service/user-service-listing:
 *   get:
 *     summary: Get service listings of logged-in user
 *     tags: [Service Listing]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of records per page
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           example: Salon
 *         description: Filter by type
 *       - in: query
 *         name: sub_type
 *         schema:
 *           type: string
 *           example: Salon
 *         description: Filter by sub type
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *           example: Rajasthan
 *         description: Filter by state
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *           example: Jaipur
 *         description: Filter by city
 *     responses:
 *       200:
 *         description: Service listings fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Service listings fetched successfully
 *                 totalRecords:
 *                   type: integer
 *                   example: 5
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *       500:
 *         description: Internal server error
 */
