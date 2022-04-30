/**
 * Test if an object is empty
 * @param object
 * @returns {boolean}
 */
import { RecursivePartial } from "./types";

export function isEmpty(object: unknown): boolean {
	return !(object && Object.keys(object as Record<string, unknown>).length);
}

/**
 * Test if an object is not empty
 * @param object
 * @returns {boolean}
 */
export function isFilled(object: unknown): boolean {
	return !isEmpty(object);
}

/**
 * Merge 2 object b into a where b appears on a
 * Can work as a deep copy: merge(source, {})
 * @param {T} a
 * @param {RecursivePartial<T>} b
 * @returns {T}
 */
export function recursiveMerge<T = Record<string, unknown>>(a: T, b: RecursivePartial<T>): T {
	const _ = {};
	for (const i of Object.keys(a))
		_[i] = i in b ? (typeof a[i] === "object" ? recursiveMerge(a[i], b[i]) : b[i]) : a[i];

	return _ as T;
}
