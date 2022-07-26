import { User, UsersModel } from '../../models/user';

const usersModel = new UsersModel();
const testUser: User = {
    first_name: 'Alaa',
    last_name: 'Alaraby',
    password: '2022#alaa'
};
let expectedUser: User;

describe("Testing user model", () => {
    it('should have an index method', () => {
        expect(usersModel.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(usersModel.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(usersModel.create).toBeDefined();
    });

    it('should have a update method', () => {
        expect(usersModel.update).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(usersModel.delete).toBeDefined();
    });


    it('should CREATE a user using create method', async () => {
        expectedUser = await usersModel.create(testUser);
        expect({
            first_name: expectedUser.first_name,
            last_name: expectedUser.last_name,
            password: expectedUser.password
        }).toEqual({
            first_name: testUser.first_name,
            last_name: testUser.last_name,
            password: testUser.password,
        });
    });

    it('should INDEX all users using index method', async () => {
        const usersList: User[] = await usersModel.index();
        expect(usersList[usersList[0].user_id as number].first_name).toEqual(expectedUser.first_name);
        expect(usersList[usersList[0].user_id as number].last_name).toEqual(expectedUser.last_name);
    });

    it('should SHOW user based on id using index method', async () => {
        const user = await usersModel.show(expectedUser.user_id as number);
        expect(user).toEqual(expectedUser);
    });

    it('should UPDATE user using update method', async () => {
        const user = await usersModel.update(expectedUser.user_id as number, expectedUser.password);
        expect({
            password: user.password
        }).toEqual({
            password: expectedUser.password
        });
    });

    it('should DELETE user using delete method', async () => {
        const deletedUser = await usersModel.delete(expectedUser.user_id as number);
        expect(deletedUser.user_id).toEqual(expectedUser.user_id);
    });

});