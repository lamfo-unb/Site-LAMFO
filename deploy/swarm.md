```
docker service create \
  --env NEXT_PUBLIC_API_CHATBOT_URL=https://lamfo.org/api/lamfo-gpt/chat \
  --replicas 1 \
  --name site-lamfo \
  --publish published=8080,target=3000 \
  dauid64/site-lamfo:1.0
```