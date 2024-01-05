module.exports = function (sequelize, DataTypes) {
    const note = sequelize.define("note", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            index: true
        },
        is_active: {
            type: DataTypes.BOOLEAN
        }
    });

    return note;
}