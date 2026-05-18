FROM node:24-alpine
RUN apk add --no-cache openssl libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --include=dev
COPY . .
RUN npx prisma generate
RUN npm run build
RUN cp -r .next/static .next/standalone/.next/static
RUN cp -r public .next/standalone/public
EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", ".next/standalone/server.js"]
