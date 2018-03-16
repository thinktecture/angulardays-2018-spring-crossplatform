import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {APP_COMPONENTS} from './components';
import {RootComponent} from './components/root/root.component';
import {APP_DIRECTIVES} from './directives';
import {ROUTES} from './routes';
import {APP_SERVICES} from './services';

@NgModule({
    declarations: [
        ...APP_COMPONENTS,
        ...APP_DIRECTIVES,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(ROUTES, { useHash: false }),
        SharedModule.forRoot(),
    ],
    bootstrap: [RootComponent],
    providers: APP_SERVICES,
})
export class AppModule {
}
