# IPL Data Platform - Deployment Guide

## Cloud Deployment Options

Choose one of the following platforms for deployment:

## Option 1: Backend on Render + Frontend on Vercel ⭐ (Recommended)

### Render (Backend)

1. **Create Render Account**
   - Visit: https://render.com
   - Sign up with GitHub

2. **Create PostgreSQL Database**
   - Dashboard → New + → PostgreSQL
   - Name: `ipl-postgres`
   - Region: Choose closest to you
   - Copy database connection string

3. **Deploy Backend**
   - Dashboard → New + → Web Service
   - Connect GitHub repository
   - Select `backend` as root directory
   - Runtime: Node
   - Build Command: `npm install && npm run prisma:generate && npm run prisma:migrate`
   - Start Command: `node src/index.js`

4. **Set Environment Variables**
   - In Render dashboard:
     ```
     DATABASE_URL=<postgres-connection-string>
     NODE_ENV=production
     PORT=5000
     ```

5. **Wait for Deployment**
   - Render auto-deploys
   - Note the backend URL: `https://your-app.onrender.com`

### Vercel (Frontend)

1. **Create Vercel Account**
   - Visit: https://vercel.com
   - Sign up with GitHub

2. **Deploy Frontend**
   - Dashboard → Add New → Project
   - Import your GitHub repository
   - Root Directory: `frontend`
   - Framework: React
   - Build Command: `npm run build`

3. **Set Environment Variables**
   - In Vercel project settings:
     ```
     REACT_APP_API_URL=https://your-app.onrender.com/api
     ```

4. **Deploy**
   - Vercel auto-deploys
   - Note the frontend URL

## Option 2: Railway (Both Backend + Frontend)

### Railway Deployment

1. **Create Railway Account**
   - Visit: https://railway.app
   - Sign up with GitHub

2. **Create PostgreSQL Plugin**
   - New → Database → PostgreSQL
   - Connect to project

3. **Deploy Backend**
   - New → GitHub Repo
   - Select your repository
   - Set root: `backend`
   - Add environment variables:
     ```
     DATABASE_URL=${{Postgres.DATABASE_URL}}
     NODE_ENV=production
     PORT=5000
     ```

4. **Deploy Frontend**
   - New → GitHub Repo
   - Select your repository
   - Set root: `frontend`
   - Add environment variables:
     ```
     REACT_APP_API_URL=<backend-url>/api
     ```

## Option 3: Heroku (Legacy)

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create apps
heroku create ipl-backend
heroku create ipl-frontend

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev -a ipl-backend

# Deploy backend
git subtree push --prefix backend heroku main

# Deploy frontend
git subtree push --prefix frontend heroku main
```

## Option 4: Docker on AWS/Azure/DigitalOcean

### Using Docker Compose

```bash
# Build Docker images
docker-compose build

# Push to Docker Hub
docker tag ipl-backend username/ipl-backend
docker push username/ipl-backend

docker tag ipl-frontend username/ipl-frontend
docker push username/ipl-frontend
```

### Deploy to DigitalOcean App Platform

1. Create App on DigitalOcean
2. Connect GitHub repository
3. Configure docker-compose.yml
4. Set environment variables
5. Deploy

## Environment Variables for Production

### Backend
```
DATABASE_URL=postgresql://user:pass@host:5432/ipl_db
NODE_ENV=production
PORT=5000
```

### Frontend
```
REACT_APP_API_URL=https://your-backend-domain/api
```

## Database Seeding on Production

### Render/Railway

1. Connect to deployed backend
2. Run seeding command:
   ```bash
   # Via SSH or terminal
   npm run seed
   ```

3. Or create a one-time job:
   - In deployment settings, add seed as separate service
   - Run once, then remove

### Alternative: Pre-seed Data

Upload seed data to cloud storage (S3/GCS) and load from there.

## Monitoring & Logs

### Render
- Dashboard → Service → Logs
- See real-time application logs

### Vercel
- Dashboard → Project → Deployments → Logs

### Railway
- Dashboard → Service → Logs
- View application output

## Performance Optimization

### Frontend
- Enable Gzip compression (automatic on Vercel)
- Optimize images
- Code splitting with React.lazy()

### Backend
- Add database indexes
- Implement caching with Redis
- Use pagination (already implemented)

### Database
- Configure connection pooling
- Add indexes on frequently queried columns
- Monitor slow queries

## Backup Strategy

### PostgreSQL Backup

```sql
-- Regular backups
pg_dump ipl_db > backup.sql

-- Restore
psql ipl_db < backup.sql
```

### Automated Backups
- Render: Automatic daily backups (included)
- Railway: Configure backup retention
- AWS RDS: Set backup window

## Domain Setup

1. Purchase domain (Namecheap, GoDaddy, etc.)
2. Update DNS records:
   - Frontend: Point to Vercel/Netlify DNS
   - Backend: Point to Render/Railway DNS

3. Enable HTTPS (automatic on these platforms)

## GitHub Actions CI/CD (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy backend
        run: |
          git subtree push --prefix backend heroku main
      - name: Deploy frontend
        run: |
          git subtree push --prefix frontend heroku main
```

## Troubleshooting Deployment

### Database Connection Timeout
- Check database connection string
- Verify IP whitelist settings
- Ensure DATABASE_URL is set

### Frontend Can't Reach Backend
- Verify REACT_APP_API_URL
- Check CORS settings in backend
- Ensure backend is running

### Build Fails
```bash
# Check logs from platform dashboard
# Common issues:
# - Missing environment variables
# - Node version mismatch
# - Dependency conflicts
```

## Cost Estimation

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| Render (Backend) | 750 hrs/mo | ~$7/mo |
| Vercel (Frontend) | Unlimited | ~$20/mo |
| Railway | $5/mo | Pay as you go |
| PostgreSQL | Included | Included |
| Total Monthly | ~$5 | ~$27 |

## Post-Deployment Checklist

- [ ] Backend deployed and responding
- [ ] Frontend deployed and accessible
- [ ] Database seeded successfully
- [ ] Health check endpoint working
- [ ] API docs accessible
- [ ] Dashboard loading data
- [ ] Pagination working
- [ ] CORS configured correctly
- [ ] Logs monitored
- [ ] Database backups configured

## Scaling Considerations

1. **Database**: Upgrade PostgreSQL tier as needed
2. **Frontend**: Vercel auto-scales
3. **Backend**: Upgrade Render/Railway resources
4. **Caching**: Add Redis for improved performance
5. **CDN**: Use Vercel's built-in CDN

## Security Best Practices

1. **Environment Variables**: Never commit `.env`
2. **Database**: Use strong passwords
3. **HTTPS**: Always enabled on these platforms
4. **CORS**: Whitelist frontend domain only
5. **API Keys**: Rotate regularly
6. **Dependencies**: Update regularly

## Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Prisma Docs**: https://www.prisma.io/docs
- **PostgreSQL Docs**: https://www.postgresql.org/docs

---

**Deployment Complete! 🚀**

Your IPL Data Platform is now live!
