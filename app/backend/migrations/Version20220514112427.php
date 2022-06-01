<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220514112427 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE recipe_home_meal (recipe_id INT NOT NULL, home_meal_id INT NOT NULL, INDEX IDX_A81111B559D8A214 (recipe_id), INDEX IDX_A81111B5D6B6AD8E (home_meal_id), PRIMARY KEY(recipe_id, home_meal_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE recipe_home_meal ADD CONSTRAINT FK_A81111B559D8A214 FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE recipe_home_meal ADD CONSTRAINT FK_A81111B5D6B6AD8E FOREIGN KEY (home_meal_id) REFERENCES meal (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE home_meal_recipe');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE home_meal_recipe (home_meal_id INT NOT NULL, recipe_id INT NOT NULL, INDEX IDX_84E3173D6B6AD8E (home_meal_id), INDEX IDX_84E317359D8A214 (recipe_id), PRIMARY KEY(home_meal_id, recipe_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE home_meal_recipe ADD CONSTRAINT FK_84E317359D8A214 FOREIGN KEY (recipe_id) REFERENCES recipe (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE home_meal_recipe ADD CONSTRAINT FK_84E3173D6B6AD8E FOREIGN KEY (home_meal_id) REFERENCES meal (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE recipe_home_meal');
    }
}
