# **Vue & React 水印组件**

## **简介**

该仓库提供了用于 Vue 和 React 的 **水印组件**。这是一个轻量级解决方案，用于在任何 Vue 或 React 项目中快速添加水印。

### **项目特点**

1. **跨框架支持**: 本项目提供了 Vue 和 React 两个版本的水印组件，广泛适用于不同的前端框架环境。
2. **性能优化**: 通过防抖逻辑 (**`debounce`**) 优化了水印绘制函数，有效减少不必要的重绘和计算。
3. **动态适应**: 水印组件能够根据父容器的尺寸自动调整，同时支持窗口缩放和 DOM 变化。
4. **可定制性**: 支持通过 **`props`** (React) 或者组件属性 (Vue) 自定义水印文本和其他样式选项。
5. **无侵入性**: 水印层通过设置 **`pointerEvents: 'none'`** 确保了不会干扰用户与页面其他元素的交互。
6. **生命周期管理**: 在 Vue 和 React 版本中都合理地使用了生命周期钩子或者 **`useEffect`** 进行资源的初始化和清理。
7. **模块化封装**: 所有的逻辑和样式都封装在独立的组件中，易于维护和复用。
8. **响应式**: Vue 版本通过 **`watch`**，React 版本通过 **`useEffect`** 实现水印文本的响应式更新。
9. **观察者模式**: 使用 **`MutationObserver`** 和 **`ResizeObserver`** 监听 DOM 和尺寸变化，确保水印与内容保持一致。
10. **代码质量**: 项目代码简洁、注释充分，方便其他开发者理解和贡献。

### **React 组件特点**

1. **使用 Refs**: 利用 **`useRef`** 创建了对 canvas 元素和父容器的引用，使 DOM 操作更直接。
2. **动态颜色设置**: 通过变量 **`dynamicColor`** 允许动态设置水印的颜色。
3. **防抖优化**: 使用 lodash 的 **`debounce`** 函数优化了 **`draw`** 函数，避免在高频事件触发时导致的性能问题。
4. **生命周期管理**: 利用 **`useEffect`** 管理组件的生命周期，包括初次渲染、窗口大小变更和父容器变化等场景。
5. **自适应尺寸**: 水印的尺寸会根据父容器的大小进行自动调整。
6. **可定制文本**: 通过 props 可以传入自定义的水印文本。
7. **透明和不干扰交互**: 使用 CSS 设定了 canvas 的 **`pointerEvents`** 为 'none'，使其不干扰下层元素的交互。
8. **封装性**: 整个水印功能被封装在一个 React 组件中，方便在其他项目中复用。

### **Vue 组件特点**

1. **引用管理**: 使用 Vue 的 **`ref`** 创建了对 canvas 元素和父容器的引用，方便进行 DOM 操作。
2. **动态颜色**: 通过 **`dynamicColor`** 变量设置了水印的动态颜色。
3. **防抖逻辑**: 使用了 lodash 的 **`debounce`** 方法对 **`draw`** 函数进行防抖处理，以优化性能。
4. **生命周期钩子**: 在 **`onMounted`** 和 **`onUnmounted`** 钩子中进行了初始化和清理工作，如事件监听和观察者。
5. **自适应尺寸**: 根据父容器的尺寸动态地调整 canvas 的大小。
6. **可定制性**: 通过 **`props`** 允许用户自定义水印文本。
7. **不干扰交互**: 设置了 **`pointerEvents: 'none'`**，使 canvas 元素不干扰用户与底层元素的交互。
8. **组件封装**: 水印逻辑被封装为一个独立的 Vue 组件，易于在其他项目中重用。
9. **响应式监听**: 使用 Vue 的 **`watch`** 功能，当 **`props.text`** 发生变化时，重新绘制水印。

这样的总结能让开发者快速地了解到这个 Vue 组件的各种优点和功能，从而更容易做出是否要使用这个组件的决策。

## **安装**

```bash
npm install your-package-name
```

## **使用方式**

### **React**

```jsx
import Watermark from "your-package-name/react";

<Watermark text="My Watermark">{/* Your content here */}</Watermark>;
```

### **Vue**

在你的 Vue 组件中：

```html
<YourWatermarkComponent :text="'My Watermark'">
  <!-- Your content here -->
</YourWatermarkComponent>
```

## **API**

### **Props**

| 属性 | 类型   | 默认值              | 描述           |
| ---- | ------ | ------------------- | -------------- |
| text | String | 'Default Watermark' | 水印的文本内容 |

## **示例**

你可以在 **`examples/`** 目录下找到更多的 Vue 和 React 示例。

## **贡献**

欢迎提交 Pull Request 或提出 Issue。

## **许可**

该项目使用 MIT 许可。
