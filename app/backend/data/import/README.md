# README

The provided files all come from [openfoodfacts](https://ch-fr.openfoodfacts.org/cgi/search.pl).



The files under "tags/" folder are all relationnal tables extracted from various columns in the main file. The file associated with the column "X" will be called "X.csv". It contains 2 columns:

* tag: The openfoodfacts' tag that is referenced in the columns and is used to bind data together
* name: the name to be displayed. Currently, the translation is not guaranted

The file "openfoodfacts_ch.csv" only old products availables in Switzerland to have a minimal set of product to deal with

A smaller set is provided under "openfoodfacts_ch_small.csv"



The most importante file for us are:

* openfoodfacts_ch.csv: contains the products

* tags/ingredients_tags.csv: contains the ingredients

* tags/allergens.csv and tags/traces_tags.csv: contains the food constraints
  Nb: in order to be able to match the openfoodfacts database, since those fields will be merged in one entity, we should be able to know what kind of column it was. Moreover: traces and allergens is not the same severity: I personnaly don't care for "traces", only for allergens.

  This currently does not provided food constraint for "contains meat" for example

Other tags would be useful later