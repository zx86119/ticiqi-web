// 导入自己需要的组件
import {
  Drawer,
  Button,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Radio,
  RadioGroup,
  RadioButton,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Table,
  TableColumn,
  Popover,
  Dialog,
  Select,
  Option,
  Form,
  FormItem,
  Input,
  Checkbox,
  CheckboxGroup,
  Switch,
  DatePicker,
  TimePicker,
  Rate,
  Upload,


  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui'

const element = {
  install: function(Vue) {
    Vue.use(Drawer)
    Vue.use(Button)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Menu)
    Vue.use(Submenu)
    Vue.use(MenuItem)
    Vue.use(MenuItemGroup)
    Vue.use(Radio)
    Vue.use(RadioGroup)
    Vue.use(RadioButton)
    Vue.use(Tooltip)
    Vue.use(Breadcrumb)
    Vue.use(BreadcrumbItem)
    Vue.use(Tag)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Popover)
    Vue.use(Dialog)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Checkbox)
    Vue.use(CheckboxGroup)
    Vue.use(Switch)
    Vue.use(DatePicker)
    Vue.use(TimePicker)
    Vue.use(Rate)
    Vue.use(Upload)


    Vue.use(Loading.directive)

    Vue.prototype.$loading = Loading.service
    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$prompt = MessageBox.prompt
    Vue.prototype.$notify = Notification
    Vue.prototype.$message = Message
  }
}

export default element
