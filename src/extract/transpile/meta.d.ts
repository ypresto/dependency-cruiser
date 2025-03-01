import {
  IAvailableExtension,
  IAvailableTranspiler,
} from "../../../types/dependency-cruiser.d.ts";

export interface ITranspilerWrapper {
  isAvailable: () => boolean;
  transpile: (
    pSource: string,
    pFileName?: string,
    pTranspilerOptions?: any
  ) => string;
}

export function getWrapper(pExtension, pTranspileOptions): ITranspilerWrapper;

export const scannableExtensions: string[];

export const allExtensions: IAvailableExtension[];

export function getAvailableTranspilers(): IAvailableTranspiler[];
