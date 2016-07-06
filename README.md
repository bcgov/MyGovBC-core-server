# myGov-core-server
A loopback API server app scaffolded with `slc loopback`.

## Development

## Registering Widget

The Widget requires registration to have meta data about the widget so we can display it on the main page and dynamically
route to it.  Eventually we'll have a UI and easier setup but for now, you have to register it in one of two ways:

1. Our API explorer (currently broken)
2. Editing `db.json` by adding a new entry for service.

### Server-only
```
git clone https://github.com/f-w/myGov-core-server.git
cd myGov-core-server
npm install
npm start
```

### Full stack
Do the server-only setup, then follow [myGov-core-client readme](https://github.com/f-w/myGov-core-client) to build dist (`npm run build`). If everything works, opening [http://localhost:9000/ext/](http://localhost:9000/ext/) in browser should reveal myGov.
