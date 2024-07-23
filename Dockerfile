FROM node:16.8-alpine3.11 as builder

ENV PORT=$PORT

WORKDIR /home/node

COPY . /home/node

RUN rm -rf /home/node/dist/

RUN rm -rf /home/node/node_modules/

RUN npm ci \
    && npm run build \
    && npm prune --production

# ---

FROM node:16.8-alpine3.11

ENV NODE_ENV production
ENV PORT=$PORT

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/.env /home/node/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/ /home/node/dist/

RUN apk --no-cache add curl

CMD ["node", "dist/main.js"]