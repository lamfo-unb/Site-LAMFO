```
docker service create \
  --env API_URL=http://backend:3000 \
  --replicas 1 \
  --name frontend-site-lamfo \
  --publish published=8080,target=8080 \
  dauid64/frontend-site-lamfo:latest
```
