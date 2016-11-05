
import { Headers } from '@angular/http';

export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/vnd.api+json');
contentHeaders.append('Content-Type', 'application/vnd.api+json');
