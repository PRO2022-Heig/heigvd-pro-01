<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220514103156 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE product_food_constraint (product_id INT NOT NULL, food_constraint_id INT NOT NULL, INDEX IDX_6C843BCE4584665A (product_id), INDEX IDX_6C843BCED9C1536B (food_constraint_id), PRIMARY KEY(product_id, food_constraint_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE recipe_ingredient (id INT AUTO_INCREMENT NOT NULL, recipe_id INT NOT NULL, ingredient_id INT NOT NULL, unit_id INT NOT NULL, quantity DOUBLE PRECISION NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_22D1FE1359D8A214 (recipe_id), INDEX IDX_22D1FE13933FE08C (ingredient_id), INDEX IDX_22D1FE13F8BD700D (unit_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE product_food_constraint ADD CONSTRAINT FK_6C843BCE4584665A FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE product_food_constraint ADD CONSTRAINT FK_6C843BCED9C1536B FOREIGN KEY (food_constraint_id) REFERENCES food_constraint (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE recipe_ingredient ADD CONSTRAINT FK_22D1FE1359D8A214 FOREIGN KEY (recipe_id) REFERENCES recipe (id)');
        $this->addSql('ALTER TABLE recipe_ingredient ADD CONSTRAINT FK_22D1FE13933FE08C FOREIGN KEY (ingredient_id) REFERENCES ingredient (id)');
        $this->addSql('ALTER TABLE recipe_ingredient ADD CONSTRAINT FK_22D1FE13F8BD700D FOREIGN KEY (unit_id) REFERENCES unit (id)');
        $this->addSql('DROP TABLE step_ingredient');
        $this->addSql('ALTER TABLE meal CHANGE restaurant_id restaurant_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE product ADD image_url VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE step CHANGE action action LONGTEXT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE step_ingredient (id INT AUTO_INCREMENT NOT NULL, ingredient_id INT NOT NULL, step_id INT NOT NULL, unit_id INT NOT NULL, amount DOUBLE PRECISION NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_67C45E31933FE08C (ingredient_id), INDEX IDX_67C45E3173B21E9C (step_id), INDEX IDX_67C45E31F8BD700D (unit_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE step_ingredient ADD CONSTRAINT FK_67C45E3173B21E9C FOREIGN KEY (step_id) REFERENCES step (id)');
        $this->addSql('ALTER TABLE step_ingredient ADD CONSTRAINT FK_67C45E31F8BD700D FOREIGN KEY (unit_id) REFERENCES unit (id)');
        $this->addSql('ALTER TABLE step_ingredient ADD CONSTRAINT FK_67C45E31933FE08C FOREIGN KEY (ingredient_id) REFERENCES ingredient (id)');
        $this->addSql('DROP TABLE product_food_constraint');
        $this->addSql('DROP TABLE recipe_ingredient');
        $this->addSql('ALTER TABLE meal CHANGE restaurant_id restaurant_id INT NOT NULL');
        $this->addSql('ALTER TABLE product DROP image_url');
        $this->addSql('ALTER TABLE step CHANGE action action VARCHAR(255) NOT NULL');
    }
}
