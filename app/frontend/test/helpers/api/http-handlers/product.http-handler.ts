import { Product, ProductService } from "../../../../src/app/api/product";
import { ModelHttpHandler } from "./model.http-handler";

export class ProductHttpHandler extends ModelHttpHandler<Product> {
	protected override getEntryPoint(): string {
		return ProductService.ENTRY_POINT;
	}

	protected verifyCreate(data: unknown): number | Product {
		if (!data)
			return 400;

		return data as Product;
	}

	protected verifyUpdate(data: unknown, stored: Product): number | Product {
		// TODO: better
		return stored;
	}

	protected override canDelete(): boolean {
		// TODO: better
		return true;
	}
}
