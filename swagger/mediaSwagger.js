/**
 * @swagger
 * tags:
 *   name: Media
 *   description: APIs for media upload and management
 */

/**
 * @swagger
 * /api/service/upload:
 *   post:
 *     summary: Upload single media file
 *     tags: [Media]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Media file to upload (image, video, or audio)
 *     responses:
 *       201:
 *         description: Media uploaded successfully
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
 *                   example: Media uploaded successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 12
 *                     original_name:
 *                       type: string
 *                       example: image.png
 *                     file_name:
 *                       type: string
 *                       example: 169546234_image.png
 *                     mime_type:
 *                       type: string
 *                       example: image/png
 *                     file_size:
 *                       type: integer
 *                       example: 245678
 *                     url:
 *                       type: string
 *                       example: https://cdn.example.com/media/169546234_image.png
 *                     created_at:
 *                       type: string
 *                       example: 2026-01-21T10:22:00Z
 *       400:
 *         description: Validation error or missing file
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
