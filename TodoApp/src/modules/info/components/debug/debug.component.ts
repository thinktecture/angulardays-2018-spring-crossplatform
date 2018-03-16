import {Component, ElementRef, ViewChild} from '@angular/core';
import {TodoService} from '../../../shared/services/base/todo.service';

@Component({
    templateUrl: 'debug.component.html',
    styleUrls: ['debug.component.scss']
})
export class DebugComponent {
    @ViewChild('info')
    public info: ElementRef;
    public debugInfo = '';

    constructor(private _todoService: TodoService) {
    }

    public async clearDatabase(): Promise<void> {
        await this._todoService.clear();
        this._addDebugInfo('Database cleared.')
    }

    public clearInfo(): void {
        this.debugInfo = '';
    }

    private _addDebugInfo(info: string) {
        this.debugInfo += `${info}\r\n`;
        this.info.nativeElement.scrollTop = this.info.nativeElement.scrollHeight;
    }
}
