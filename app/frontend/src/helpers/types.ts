/**
 * Must have the keys of T
 */
export type KeysOf<T, S = unknown> = {
	[P in keyof T]: S;
};

export type RecursiveReadonly<T> = {
	readonly [P in keyof T]: RecursiveReadonly<T[P]>;
};

export type RecursivePartial<T> = {
	[P in keyof T]?: RecursivePartial<T[P]>;
};

export type RecursiveWriteable<T> = {
	-readonly [P in keyof T]: RecursiveWriteable<T[P]>;
};
