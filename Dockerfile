FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
ADD dist/timesheet-ui /usr/share/nginx/html
