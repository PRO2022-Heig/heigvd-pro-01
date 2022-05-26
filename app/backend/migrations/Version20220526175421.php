<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220526175421 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE group_user_membership DROP INDEX UNIQ_9F0B89B0FE54D947, ADD INDEX IDX_9F0B89B0FE54D947 (group_id)');
        $this->addSql('ALTER TABLE group_user_membership DROP INDEX UNIQ_9F0B89B0A76ED395, ADD INDEX IDX_9F0B89B0A76ED395 (user_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9F0B89B0FE54D947A76ED395 ON group_user_membership (group_id, user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE group_user_membership DROP INDEX IDX_9F0B89B0FE54D947, ADD UNIQUE INDEX UNIQ_9F0B89B0FE54D947 (group_id)');
        $this->addSql('ALTER TABLE group_user_membership DROP INDEX IDX_9F0B89B0A76ED395, ADD UNIQUE INDEX UNIQ_9F0B89B0A76ED395 (user_id)');
        $this->addSql('DROP INDEX UNIQ_9F0B89B0FE54D947A76ED395 ON group_user_membership');
    }
}
