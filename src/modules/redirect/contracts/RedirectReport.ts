export interface RedirectReport {
  id: string;
  redirect_id: string;
  ip: string;
  os: string;
  platform: string;
  browser: string;
  browser_version: string;
  isMobile: boolean;
  isDesktop: boolean;
  isBot: boolean;
  isAndroid: boolean;
  isiPhone: boolean;
  isMac: boolean;
  isLinux: boolean;
  isWindows: boolean;
}

export interface RedirectReportRequestData {
  url_code: string;
  ip: string;
  os?: string;
  platform?: string;
  browser?: string;
  browser_version?: string;
  isMobile?: boolean;
  isDesktop?: boolean;
  isBot?: boolean;
  isAndroid?: boolean;
  isiPhone?: boolean;
  isMac?: boolean;
  isLinux?: boolean;
  isWindows?: boolean;
}

export interface RedirectReportCreateData {
  ip: string;
  os?: string;
  platform?: string;
  browser?: string;
  browser_version?: string;
  isMobile?: boolean;
  isDesktop?: boolean;
  isBot?: boolean;
  isAndroid?: boolean;
  isiPhone?: boolean;
  isMac?: boolean;
  isLinux?: boolean;
  isWindows?: boolean;
  redirect_id: string;
}
