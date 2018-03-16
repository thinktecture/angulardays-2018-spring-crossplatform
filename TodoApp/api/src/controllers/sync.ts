import {BaseController} from './base';
import {HttpServer} from '../server/httpServer';
import {Request, Response} from 'restify';
import {ISyncItem} from '../models/syncItem.interface';
import uuid = require('uuid');

export class SyncController implements BaseController {
    private _map = new Map<string, Array<any>>();
    private _defaultItems = [{
        syncId: '11e94ce4-e717-41d5-9a67-e70331cd7a42',
        deleted: false,
        changed: false,
        completed: false,
        text: 'Prepare BASTA! demo',
    }, {
        syncId: '60d09e91-651d-41d3-bc6b-5500cbcc53bf',
        deleted: false,
        changed: false,
        completed: false,
        text: 'Prepare BASTA! slides'
    }];

    public setup(httpServer: HttpServer): void {
        httpServer.post('/sync', this._sync.bind(this));
    }

    private async _sync(req: Request, res: Response) {
        const userId = req.header('X-User-ID');
        let items = this._map.get(userId);
        if (!items) {
            const newItems = JSON.parse(JSON.stringify(this._defaultItems));
            this._map.set(userId, newItems);
            items = newItems;
        }

        const list: Array<ISyncItem> = req.body;
        list.forEach(syncItem => {
            const index = items.findIndex(item => item.syncId === syncItem.syncId);
            if (index >= 0) {
                if (syncItem.changed || syncItem.deleted) {
                    syncItem.changed = false;
                    items[index] = syncItem;
                }
            } else {
                if (!syncItem.syncId) {
                    syncItem.syncId = uuid.v4();
                    syncItem.changed = false;
                }

                items.push(syncItem);
            }
        });

        res.send(200, items);
    }
}
