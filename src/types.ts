import type { PluginOptions } from './plugin/types/options.js';
import type { ComponentCompiler } from './plugin/types/compiler.js';

export { PluginOptions, ComponentCompiler };

// Re-export for Unplugin Icons compatibility
export type Options = PluginOptions;
