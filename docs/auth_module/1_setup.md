# Auth setup

## Use Auth0 for authentication
- ref: https://auth0.com/docs/quickstart/spa/angular/01-login

## STEP 1: Create an Auth0 account

## STEP 2: install Auth0 SDK
```bash
  npm install @auth0/auth0-angular
```

## STEP 3: Add Auth0 configuration
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAuth0 } from '@auth0/auth0-angular';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideAuth0({
      domain: '{yourDomain}',
      clientId: '{yourClientId}',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ]
});
```

### STEP 4: Add Auth0 login button
```typescript
import { Component } from '@angular/core';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  template: '<button (click)="auth.loginWithRedirect()">Log in</button>',
  standalone: true
})
export class AuthButtonComponent {
  // Inject the authentication service into your component through the constructor
  constructor(public auth: AuthService) {}
}
```

### STEP 5: Add Auth0 logout button
```typescript
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-button',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <button (click)="auth.logout({ logoutParams: { returnTo: document.location.origin } })">
        Log out
      </button>
    </ng-container>

    <ng-template #loggedOut>
      <button (click)="auth.loginWithRedirect()">Log in</button>
    </ng-template>
  `,
  standalone: true
})
export class AuthButtonComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
}
```

### STEP 6: Read user info

```typescript
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  template: `
    <ul *ngIf="auth.user$ | async as user">
      <li>{{ user.name }}</li>
      <li>{{ user.email }}</li>
    </ul>`,
  standalone: true
})
export class UserProfileComponent {
  constructor(public auth: AuthService) {}
}
```
