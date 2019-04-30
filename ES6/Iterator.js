/**
 * 遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）
 * Iterator创建一个指针对象，指向当前数据结构的起始位置，每次调用指针对象的next方法，指向数据结构的下一个位置。
 * 原生具备 Iterator 接口的数据结构如下。
        Array
        Map
        Set
        String
        TypedArray
        函数的 arguments 对象
        NodeList 对象
 */