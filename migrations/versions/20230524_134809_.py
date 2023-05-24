"""empty message

Revision ID: b1e53bbcd521
Revises: 18a2eaa5e8cd
Create Date: 2023-05-24 13:48:09.057976

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b1e53bbcd521'
down_revision = '18a2eaa5e8cd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('genres',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('genre', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('movies', schema=None) as batch_op:
        batch_op.create_foreign_key(None, 'genres', ['genre'], ['genre'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('movies', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')

    op.drop_table('genres')
    # ### end Alembic commands ###