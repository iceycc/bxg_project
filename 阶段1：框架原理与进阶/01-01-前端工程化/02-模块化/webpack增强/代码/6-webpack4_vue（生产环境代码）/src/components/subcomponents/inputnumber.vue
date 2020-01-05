<template>
    <div>
        <div class="left" @click="substrict">-</div>
        <div class="middle">{{count}}</div>
        <div class="right" @click="add">+</div>
    </div>
</template>

<style scoped>
    .left,.middle,.right{
        display: inline-block;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border: 1px solid rgba(92,92, 92, 0.3)
    }
</style>

<script>
    export default {
        // props:['initCount'],
        props:{
            initCount:{
                type: Number,
                default: 100
            },
            goodsId:Number
        },
        data(){
            return {
                count:1
            }
        },
        created() {
            this.count = this.initCount
        },
        methods:{
            substrict(){
                if(this.count<=1) return

                this.count--

                this.notify()
            },
            add(){
                this.count++

                this.notify()
            },
            notify(){
                const goods = {
                    goodsId:this.goodsId,
                    count:this.count
                }
                
                //子组件通过 this.$emit，触发自定义事件，并且传递值
                this.$emit('numberChange',goods)
            }
        }
    }
</script>