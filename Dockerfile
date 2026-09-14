# Église Baptiste d'Ahala — site statique servi par Nginx
FROM nginx:1.27-alpine

RUN rm -rf /usr/share/nginx/html/* \
    && rm -f /etc/nginx/conf.d/default.conf

# Config Nginx dédiée (cache, routes propres)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Contenu du site (racine du dépôt = racine publiée)
COPY index.html /usr/share/nginx/html/index.html
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
