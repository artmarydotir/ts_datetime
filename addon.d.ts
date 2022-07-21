// declare Intl {
//     getCanonicalLocales(locales: string): string[];
// }

// // declare function log: Intl.getCanonicalLocales = function();

declare namespace Intl {
  function getCanonicalLocales(locales: string | string[]): string[];
}
// //     interface IncomingMessage {
// //       token?: Token;
// //       requireUserRole(roles: string[]): boolean;
// //       log(msg: string | object, level?: string): void;
// //       getClientIP(): string;
// //       isFromPrivateNetwork(): boolean;
// //       serverTimings: ServerTimings[];
// //       addTiming(step: string, time: Date = new Date()): void;
// //       getFirstHeader(name: string): string;
// //     }
// //   }
