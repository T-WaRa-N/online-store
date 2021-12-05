import React from 'react';
import Loggin from '../Loggin'
import renderer from 'react-test-renderer'

test(" Loggin page rendered correctly?", ()=>{
    const tree = renderer
    .create(<Loggin />)
    .toJSON()
    expect(tree).toMatchSnapshot()
})
