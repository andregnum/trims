import { ConfigService } from '@nestjs/config';

export type ConfigValueType = string | number | boolean | null | undefined;

/**
 * Helper generik untuk mengambil nilai konfigurasi dari `ConfigService`
 * dengan validasi tipe melalui parser.
 *
 * @template T - Tipe nilai konfigurasi yang diharapkan.
 * @param cs - Instance `ConfigService` dari NestJS.
 * @param key - Nama key konfigurasi yang ingin diambil.
 * @param parser - Fungsi parser untuk memvalidasi dan mengubah nilai mentah.
 * @param def - Nilai default jika hasil parser `null` atau `undefined`.
 * @returns Nilai konfigurasi yang sudah tervalidasi atau default.
 *
 * @example
 * const port = cfgEnv(configService, 'PORT', Number, 3000);
 */
export function cfgEnv<T extends ConfigValueType>(
  cs: ConfigService,
  key: string,
  parser: (v: unknown) => T,
  def: NonNullable<T>,
): NonNullable<T> {
  const raw = cs.get<T>(key);
  const parsed = parser(raw);
  return parsed !== undefined && parsed !== null ? parsed : def;
}

/**
 * Ambil konfigurasi bertipe string.
 *
 * @param cs - Instance `ConfigService`.
 * @param key - Nama key konfigurasi.
 * @param def - Nilai default jika tidak ditemukan atau bukan string.
 * @returns Nilai string konfigurasi atau default.
 *
 * @example
 * const appName = cfgStr(configService, 'APP_NAME', 'MyApp');
 */
export const cfgStr = (cs: ConfigService, key: string, def: string) => {
  return cfgEnv(cs, key, (v) => (typeof v === 'string' ? v : undefined), def);
};

/**
 * Ambil konfigurasi bertipe boolean.
 * Mendukung parsing dari string `"true"` / `"false"`.
 *
 * @param cs - Instance `ConfigService`.
 * @param key - Nama key konfigurasi.
 * @param def - Nilai default jika tidak ditemukan atau tidak valid.
 * @returns Nilai boolean konfigurasi atau default.
 *
 * @example
 * const isProd = cfgBool(configService, 'IS_PROD', false);
 */
export const cfgBool = (cs: ConfigService, key: string, def: boolean) => {
  return cfgEnv(
    cs,
    key,
    (v) => {
      if (typeof v === 'boolean') return v;
      if (typeof v === 'string') {
        const t = v.trim().toLowerCase();
        if (t === 'true') return true;
        if (t === 'false') return false;
      }
      return undefined;
    },
    def,
  );
};

/**
 * Ambil konfigurasi bertipe string atau number.
 *
 * @param cs - Instance `ConfigService`.
 * @param key - Nama key konfigurasi.
 * @param def - Nilai default jika tidak ditemukan atau bukan string/number.
 * @returns Nilai string/number konfigurasi atau default.
 *
 * @example
 * const timeout = cfgStrOrNum(configService, 'TIMEOUT', 5000);
 */
export const cfgNum = (cs: ConfigService, key: string, def: number) => {
  return cfgEnv(
    cs,
    key,
    (v) => {
      if (typeof v === 'number') return v;

      if (typeof v === 'string' && !isNaN(Number(v))) return Number(v);

      return undefined;
    },
    def,
  );
};

/**
 * Ambil konfigurasi bertipe string atau number.
 *
 * @param cs - Instance `ConfigService`.
 * @param key - Nama key konfigurasi.
 * @param def - Nilai default jika tidak ditemukan atau bukan string/number.
 * @returns Nilai string/number konfigurasi atau default.
 *
 * @example
 * const timeout = cfgStrOrNum(configService, 'TIMEOUT', 5000);
 */
export const cfgStrOrNum = (
  cs: ConfigService,
  key: string,
  def: string | number,
) => {
  return cfgEnv(
    cs,
    key,
    (v) => {
      if (typeof v === 'number' || typeof v === 'string') return v;

      return undefined;
    },
    def,
  );
};
