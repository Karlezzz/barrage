import requestMock from './requestMock'


export const reqUserLogin = (data) => requestMock({
    url:'https://www.fastmock.site/mock/6fb036f9a523faa1abf35ad394f8483e/api/userLogin',
    method:'post',
    data
})