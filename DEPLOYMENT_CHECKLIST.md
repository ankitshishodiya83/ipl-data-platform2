# 🚀 Deployment Checklist

Use this checklist before deploying to production.

## Pre-Deployment

### Local Testing
- [ ] Backend running without errors: `npm run dev`
- [ ] Frontend running without errors: `npm start`
- [ ] All pages loading correctly
- [ ] API endpoints responding (test via Swagger)
- [ ] Pagination working
- [ ] Charts rendering properly
- [ ] Error states displaying correctly
- [ ] Loading states showing
- [ ] Empty states visible

### Database
- [ ] PostgreSQL running
- [ ] Database created and populated
- [ ] Migrations applied successfully
- [ ] Seed data loaded (74 matches)
- [ ] No database errors in logs

### Code Quality
- [ ] No console errors in browser
- [ ] No errors in terminal
- [ ] No hardcoded URLs (use env vars)
- [ ] Environment files configured
- [ ] .env files NOT in git (.gitignore set)

---

## Backend Deployment (Render Recommended)

### Pre-deployment
- [ ] Push code to GitHub
- [ ] .env NOT in repository
- [ ] package.json has all dependencies
- [ ] package.json scripts correct
- [ ] Prisma schema up to date
- [ ] Migrations committed to git

### Render Setup
- [ ] Create Render account
- [ ] Create PostgreSQL database
- [ ] Note DATABASE_URL from Render
- [ ] Create Web Service
- [ ] Connect GitHub repository
- [ ] Set root directory: `backend`
- [ ] Set environment variables:
  ```
  DATABASE_URL=<from-render-postgres>
  NODE_ENV=production
  PORT=5000
  ```
- [ ] Set build command: `npm install && npm run prisma:generate && npm run prisma:migrate`
- [ ] Set start command: `node src/index.js`
- [ ] Deploy
- [ ] Note backend URL: `https://your-app.onrender.com`

### Post-deployment
- [ ] Check Render logs for errors
- [ ] Test health endpoint: `https://your-app.onrender.com/api/health`
- [ ] Test API endpoint: `https://your-app.onrender.com/api/matches`
- [ ] Verify Swagger docs: `https://your-app.onrender.com/api-docs`
- [ ] No CORS errors in frontend

---

## Frontend Deployment (Vercel Recommended)

### Pre-deployment
- [ ] Update .env with backend URL
- [ ] Test with real backend URL locally
- [ ] No hardcoded localhost URLs
- [ ] Build succeeds locally: `npm run build`
- [ ] Code committed to GitHub

### Vercel Setup
- [ ] Create Vercel account
- [ ] Import GitHub repository
- [ ] Set root directory: `frontend`
- [ ] Set environment variable:
  ```
  REACT_APP_API_URL=<your-backend-url>/api
  ```
- [ ] Deploy
- [ ] Note frontend URL

### Post-deployment
- [ ] Vercel shows successful deployment
- [ ] App loads at frontend URL
- [ ] Pages accessible
- [ ] API calls working (check network tab)
- [ ] Charts loading
- [ ] Tables displaying data
- [ ] No CORS errors

---

## Post-Deployment Testing

### Functionality
- [ ] All pages load
- [ ] Dashboard displays stats
- [ ] Matches page shows list
- [ ] Teams page shows teams
- [ ] Players page shows players and charts
- [ ] Pagination works
- [ ] Filters work
- [ ] Charts render correctly

### API
- [ ] Health check: `GET /api/health`
- [ ] Matches: `GET /api/matches`
- [ ] Teams: `GET /api/teams`
- [ ] Players: `GET /api/players`
- [ ] Swagger docs accessible

### Performance
- [ ] Page loads in < 3 seconds
- [ ] API responds in < 1 second
- [ ] Charts render smoothly
- [ ] Tables scroll smoothly
- [ ] No memory leaks

### Errors
- [ ] No console errors
- [ ] No network errors
- [ ] Proper error messages shown
- [ ] 404 handling works
- [ ] 500 handling works

---

## Database Maintenance

### Backups
- [ ] Automated backups enabled (Render includes this)
- [ ] Test backup restore process
- [ ] Document backup schedule

### Monitoring
- [ ] Set up error logging
- [ ] Monitor database performance
- [ ] Monitor API response times
- [ ] Set up uptime monitoring

---

## Security Checklist

### Environment
- [ ] No secrets in code
- [ ] .env files in .gitignore
- [ ] Environment variables set on platform
- [ ] CORS configured correctly
- [ ] Only frontend domain whitelisted

### API
- [ ] Input validation working
- [ ] Error messages don't leak info
- [ ] No sensitive data in logs
- [ ] HTTPS enabled (automatic on Vercel/Render)

### Database
- [ ] Strong password for database
- [ ] Database URL not hardcoded
- [ ] Connection pooling configured
- [ ] Regular backups enabled

---

## Documentation

### Before Deployment
- [ ] README.md updated with live URLs
- [ ] Deployment instructions documented
- [ ] Environment variables documented
- [ ] Known issues documented
- [ ] Troubleshooting guide complete

### After Deployment
- [ ] Add deployed URLs to README
- [ ] Document deployment process
- [ ] Create runbook for common issues
- [ ] Document scaling strategy

---

## Monitoring & Alerts

### Set Up
- [ ] Error tracking (Sentry optional)
- [ ] Uptime monitoring (UptimeRobot)
- [ ] Performance monitoring
- [ ] Alert on errors

### Dashboard
- [ ] Monitor error rates
- [ ] Monitor response times
- [ ] Monitor database connections
- [ ] Monitor resource usage

---

## Scaling Preparation

### If Traffic Increases
- [ ] Database: Upgrade Render tier
- [ ] Backend: Upgrade Render tier
- [ ] Frontend: Automatic (Vercel)
- [ ] CDN: Already included (Vercel)

### Optimization
- [ ] Enable caching headers
- [ ] Compress responses
- [ ] Database query optimization
- [ ] Frontend code splitting

---

## Rollback Plan

If deployment fails:
1. [ ] Keep previous version tag in Git
2. [ ] Document rollback steps
3. [ ] Test rollback process
4. [ ] Have backup database snapshot

### Rollback Steps
```bash
# Backend
git checkout previous-version-tag
git push (Render auto-deploys)

# Frontend
git checkout previous-version-tag
git push (Vercel auto-deploys)
```

---

## Post-Launch

### First Week
- [ ] Monitor errors closely
- [ ] User feedback collection
- [ ] Performance monitoring
- [ ] Bug fixes as needed

### Ongoing
- [ ] Weekly backups verification
- [ ] Security updates
- [ ] Dependency updates
- [ ] Performance optimization
- [ ] User feedback implementation

---

## Useful Commands

```bash
# Check Render logs
heroku logs --app=your-app --tail

# Check Vercel logs
vercel logs

# Database backup
pg_dump ipl_db > backup.sql

# Database restore
psql ipl_db < backup.sql
```

---

## Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **PostgreSQL**: https://www.postgresql.org/docs
- **Express**: https://expressjs.com
- **React**: https://react.dev

---

## Sign-Off

- [ ] All checks completed
- [ ] Ready for production
- [ ] Team approval obtained
- [ ] Monitoring in place

**Deployment Date**: ___________  
**Deployed By**: ___________  
**Verified By**: ___________  

---

**Good luck with your deployment! 🚀**
