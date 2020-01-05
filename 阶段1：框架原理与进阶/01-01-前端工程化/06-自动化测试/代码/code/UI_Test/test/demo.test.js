import React from 'react'
import Enzyme,{ mount } from 'enzyme'
import Demo from '../src/Demo'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

Enzyme.configure({ adapter: new Adapter() })

describe("UI Test #demo",()=>{
    it('should have title',()=>{
        const wrapper = mount(<Demo />)
        const title = wrapper.find('h1')
        expect(title).toHaveLength(1)
        expect(title.text()).toBe("This is Demo")
    })

    it('should add 1 when button click',()=>{
        const wrapper = mount(<Demo />)
        const counter = wrapper.find('.counter')
        const v1 = parseInt(counter.text())
        
        // 模拟点击
        wrapper.find('button').simulate('click')
        const v2 = parseInt(counter.text())

        // 期望 
        expect(v2).toBe(v1 + 1)
    })

    it('should change when input change',()=>{
        const wrapper = mount(<Demo />)
        const counter = wrapper.find('.counter')
        
        // 模拟更改
        wrapper.find('input').simulate('change',{
            target:{
                value:'5'
            }
        })

        // 期望
        expect(counter.text()).toBe("5")
    })

    // //检测更改state
    it('should change when props change',()=>{
        const wrapper = mount(<Demo title="Demo" value={5}/>)
        const title = wrapper.find('h1')
        
        sinon.spy(Demo.prototype, 'componentWillReceiveProps')

        // 模拟更改Props
        wrapper.setProps({
            title:"Demo2"
        })

        // 期望 
        expect(title.text()).toBe("Demo2")

        const callCount = Demo.prototype.componentWillReceiveProps.callCount
        // 期望 
        expect(callCount).toBe(1)
    })
})