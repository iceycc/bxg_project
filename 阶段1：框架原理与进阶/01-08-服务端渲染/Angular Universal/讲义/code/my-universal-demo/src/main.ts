import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// 引入根模块
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// 模块初始化
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
