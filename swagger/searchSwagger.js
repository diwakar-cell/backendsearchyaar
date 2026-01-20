/**
 * @swagger
 * tags:
 *   name: Service
 *   description: APIs for categories, products, deals, locations, and services
 */
/**
 * @swagger
 * /api/search/category:
 *   get:
 *     summary: Get list of categories
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 *       400:
 *         description: Failed to fetch categories
 */

/**
 * @swagger
 * /api/search/products:
 *   get:
 *     summary: Get list of products
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *       400:
 *         description: Failed to fetch products
 */

/**
 * @swagger
 * /api/search/deals:
 *   get:
 *     summary: Get list of deals
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Deals fetched successfully
 *       400:
 *         description: Failed to fetch deals
 */


/**
 * @swagger
 * /api/search/state:
 *   get:
 *     summary: Get list of states
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: States fetched successfully
 *       400:
 *         description: Failed to fetch states
 */

/**
 * @swagger
 * /api/search/city:
 *   get:
 *     summary: Get list of cities
 *     tags: [Service]
 *     parameters:
 *       - in: query
 *         name: stateId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter cities by state ID
 *     responses:
 *       200:
 *         description: Cities fetched successfully
 *       400:
 *         description: Failed to fetch cities
 */

/**
 * @swagger
 * /api/search/events:
 *   get:
 *     summary: Get list of events
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Events fetched successfully
 *       400:
 *         description: Failed to fetch events
 */

/**
 * @swagger
 * /api/search/service
 *   get:
 *     summary: Get list of services
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: Services fetched successfully
 *       400:
 *         description: Failed to fetch services
 */
