export enum SENDGRID_TEMPLATES {
  VERIFICATION_CODE = 'd-a1676ad290bb4740b91bfe5444fc5085',
}

export enum SENDGRID_CONTACTS_LISTS {
  FOUNDER_PASS = 'b8d485c7-8866-4879-a9e6-06927fb92736',
}

export enum STATUS_CODES {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  VALIDATION_ERROR = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export enum LOADER_TYPE {
  default = 'default',
  app = 'app',
  container = 'container',
};

export enum SOCIAL_ICON_TYPE {
  instagram = 'instagram',
  discord = 'discord',
  twitter = 'twitter',
}

export enum DEVICE_TYPE {
  mobile = 'mobile',
  desktop = 'desktop',
};

export enum ROUTE_PATH {
  HOME = '/',
  FAQ = '/faq',
  PRESS = '/press',
  SHOP = 'https://shop.hallofgoats.com',
  PRIVACY_POLICY = 'https://app.termly.io/policy-viewer/policy.html?policyUUID=e8dc47f7-952c-4463-a3ad-585b0c577a91',
  TERMS_OF_USE = 'https://app.termly.io/policy-viewer/policy.html?policyUUID=7e67f39f-c267-4446-82f3-f861d5a32462',
};

export enum SOCIAL_LINKS {
  instagram = 'https://instagram.com/goats.hall',
  discord = 'https://discord.gg/2bMtYjyNbE',
  twitter = 'https://twitter.com/GOATS_hall',
};

export enum MODAL_TYPE {
  message = 'message',
};

export enum STEP_VERIFICATION {
  send = 'send',
  code = 'code',
  loading = 'loading',
};