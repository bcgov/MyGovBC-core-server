# myGov-core-server
A loopback API server app scaffolded with `slc loopback`.

## Development

### Server-only
```
git clone https://github.com/f-w/myGov-core-server.git
cd myGov-core-server
npm install
npm start
```

### Full stack
Do the server-only setup, then follow [myGov-core-client readme](https://github.com/f-w/myGov-core-client) to build dist (`npm run build`). If everything works, opening `http://localhost:9000/ext/` in browser should reveal myGov.
