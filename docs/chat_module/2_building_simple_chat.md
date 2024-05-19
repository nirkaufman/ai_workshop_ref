# Building simple Chat

## Step 1: create a function in `services/chat.js`

```typescript
interface ChatMessage {
  role: string;
  content: string | null;
}

async function newMessage(history: any[], message: any): Promise<ChatMessage> {
  const response = await openAi.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are an HR assistant. You are helping a tech human resource professional to hire candidates.",
      },
      ...history,
      message
    ],
  });

  return response.choices[0].message ;
}

const chatHistory: ChatMessage[] = []

export async function getChatResponse(userMessage: string): Promise<ChatMessage[]> {
  const formattedMessage = { role: "user", content: userMessage }
  const chatResponse = await newMessage(chatHistory, formattedMessage)

  chatHistory.push(formattedMessage, chatResponse)

  return chatHistory;
}


```

## Step 2: refactor the controller to use the chat function

```typescript
app.post('/chat', async (req, res) => {
  const message = req.body.message;
  const response = await getChatResponse(message);
  res.send(response);
});
```

## Step 3: test the chat function

```bash
 curl -X POST -H "Content-Type: application/json" -d '{"message":"Hello, world!"}' http://localhost:3000/chat
```

## Step 4: Init an Angular application

```bash
  npm install -g @angular/cli
```

```bash
   ng new hire-power-client
```


## Step 5: Add tailwind support

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

__tailwind.config.js__

```javascript
content: [
    "./src/**/*.{html,ts}",
  ]
```

_style.css_

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 6: cleanup and configure the app
- delete `app.component.html` and `app.component.css`
- update `angular.json`
```json
"schematics": {
        "@schematics/angular:component": {
          "skipTests": true,
          "inlineTemplate": true,
          "inlineStyle": true
        }
      "prefix": "hp",
```

### Step 7: create a chat component

```bash
  ng g c chat
```

### Step 8: add the chat component to the app

```html
<div>
    <h1>Hire Power!</h1>
    <hp-chat />
</div>

```

### Step 9: create a chat service inside the chat folder

```bash
  ng g s chat/chat
``` 

### Step 10: implement the chat service
- provide Http in `main configuration`

```typescript
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()]
};
```

- use "service with a signal" pattern

```typescript
import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {toObservable} from "@angular/core/rxjs-interop";
import { switchMap} from "rxjs";

export interface ChatMessage {
  role: string;
  content: string | null;
}

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private readonly httpClient = inject(HttpClient);
  private readonly prompt = signal<string>('Hello!');

  private getResponse(userPrompt: string) {
    return this.httpClient.post<ChatMessage[]>(`http://localhost:3000/chat`, {message: userPrompt}, {
      responseType: 'json'
    });
  }

  chatResponse$ = toObservable(this.prompt).pipe(
    switchMap((message) => this.getResponse(message)),
  );

  updatePrompt(input: string) {
    this.prompt.set(input);
  }
}

```

### Step 11: implement the chat component
```typescript
import {AfterViewInit, Component, computed, ElementRef, inject, OnDestroy, ViewChild} from '@angular/core';
import {ChatService} from "./chat.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {AsyncPipe, NgClass} from "@angular/common";

@Component({
  selector: 'hp-chat',
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass
  ],
  template: `
    <div class="flex flex-col h-screen">
      <div class="overflow-auto p-4" #chatContainer>
        <ul class="space-y-4">
          @for (msg of chatResponse(); track msg) {
            <li class="p-2 rounded-md"
                [ngClass]="{'bg-blue-200': msg.role === 'user', 'bg-green-200': msg.role === 'assistant'}">
              {{ msg.role}}:
              {{ msg.content }}
            </li>
          }
        </ul>
      </div>
      <div class="p-4 bg-gray-200 sticky bottom-0">
        <input class="w-full p-2 rounded-md" (keydown.enter)="handleUserPrompt($event)">
      </div>
    </div>
  `,
})
export class ChatComponent implements AfterViewInit, OnDestroy {
  private mutationObserver: MutationObserver;
  readonly chatService = inject(ChatService);
  
  @ViewChild('chatContainer') private chatContainer: ElementRef;
  
  chatResponse = toSignal(this.chatService.chatResponse$, { initialValue: [] });

  handleUserPrompt(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.chatService.updatePrompt(inputElement.value);
    inputElement.value = '';
  }

  ngAfterViewInit() {
    this.mutationObserver = new MutationObserver(() => {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    });

    this.mutationObserver.observe(this.chatContainer.nativeElement, {
      childList: true,
      subtree: true
    });
  }

  ngOnDestroy() {
    this.mutationObserver.disconnect();
  }
}
```

### Step 12: discussions
- ref: https://scottmoss.notion.site/Scaling-chat-06ef53fba44b4757b5e566841b6b7342
