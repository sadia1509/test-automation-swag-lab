// environment variables
export const ENVS: Record<string, string> = { /* An "exported constant object" typed with TypeScript’s Record utility and a const assertion. */
    QA: 'qa',
    STG: 'stg',
    PROD: 'prod',
} as const;

// timeouts
export const TIMEOUTS: Record<string, number> = {
    NONE: 0, /* no timeout */
    SANITY: 60_000, /* 1 minute in milliseconds */
    REGRESSION: 120_000, /* 2 minutes in milliseconds */
    LONG: 300_000, /* 5 minutes in milliseconds and for demo set it 0 */
    DEMO: 3_000, /* 3 seconds in milliseconds */
} as const;

// browser types
export const BROWSERS: Record<string, string> = {
    CHROME: 'Chrome',
    SAFARI: 'Safari',
    FIREFOX: 'Firefox',
    EDGE: 'Edge',
    MOBILE_SAFARI: 'Mobile Safari',
    MOBILE_CHROME: 'Mobile Chrome',
} as const;

// platform types
export const PLATFORMS: Record<string, string> = {
    IOS: 'iOS',
    ANDROID: 'Android',
    MACOS: 'macOS',
    WINDOWS: 'Windows',
} as const;

export const SORT_OPTIONS: Record<string, string> = {
    NAME_ASC: 'Name (A to Z)',
    NAME_DESC: 'Name (Z to A)',
    PRICE_ASC: 'Price (low to high)',
    PRICE_DESC: 'Price (high to low)',
} as const;