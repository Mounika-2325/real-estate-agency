/**
 * Admin Authorization Middleware:
 * Protects administrative operations:
 * - POST /api/properties
 * - PUT /api/properties/:id
 * - DELETE /api/properties/:id
 * - POST /api/seed
 *
 * Requires 'x-admin-key' header matching process.env.ADMIN_API_KEY or default secret.
 */
export const requireAdmin = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'] || req.query.adminKey;
  const expectedKey = process.env.ADMIN_API_KEY || 'estatepro-admin-secret-2026';

  if (!adminKey || adminKey !== expectedKey) {
    res.status(401);
    return next(new Error('Unauthorized: Admin authorization key missing or invalid. Pass x-admin-key header.'));
  }

  next();
};
