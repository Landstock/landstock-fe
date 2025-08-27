<template>
  <div class="container mt-4">
    <h2 class="text-center mb-3">Quản lý người dùng</h2>

    <ejs-button @click="excelExport">Export to Excel</ejs-button>
    <!-- Bảng hiển thị người dùng, phân trang, sắp xếp, chỉnh sửa, nhóm dl, xuất file excel -->
    <ejs-grid
      ref="grid"
      :dataSource="users"
      :allowPaging="true"
      :pageSettings="{ pageSize: limit, pageSizes: false, pageSize: 20 }"
      :allowSorting="true"
      :editSettings="editSettings"
      :toolbar="toolbar"
      @actionBegin="actionBegin"
      @actionComplete="actionComplete"
      :allowGrouping="true"
      :allowExcelExport="true"
      :allowPdfExport="true"
    >
      >
      <e-columns>
        <e-column
          headerText="STT"
          width="80"
          textAlign="Center"
          :valueAccessor="indexAccessor"
        />
        <e-column field="username" headerText="Tên người dùng" width="150" />
        <e-column
          field="email"
          :allowGrouping="false"
          headerText="Email"
          width="200"
        />
        <e-column field="phonenumber" headerText="Số điện thoại" width="150" />
        <e-column
          field="role"
          headerText="Vai trò"
          width="120"
          :template="'roleTemplate'"
        />
        <e-column
          headerText="Hành động"
          width="120"
          textAlign="Center"
          :template="'actionTemplate'"
        />
      </e-columns>

      <!-- Template vai trò -->
      <template v-slot:roleTemplate="{ data }">
        <span>
          {{
            data.role === 0 ? "Admin" : data.role === 1 ? "Operator" : "User"
          }}
        </span>
      </template>

      <!-- Template hành động -->
      <template v-slot:actionTemplate="{ data }">
        <button class="btn btn-danger btn-sm" @click="deleteUser(data.id)">
          Xóa
        </button>
      </template>
    </ejs-grid>
  </div>
</template>

<script>
import {
  GridComponent as EjsGrid,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Sort,
  Edit,
  Toolbar,
  Group,
  ExcelExport,
} from "@syncfusion/ej2-vue-grids";
import { ButtonComponent as EjsButton } from "@syncfusion/ej2-vue-buttons";

export default {
  components: {
    EjsGrid,
    eColumns: ColumnsDirective,
    eColumn: ColumnDirective,
    EjsButton,
  },
  data() {
    return {
      limit: 20,
      editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Normal", // hoặc 'Dialog', 'Batch'
      },
      toolbar: ["Add", "Edit", "Delete", "Update", "Cancel"],
    };
  },
  computed: {
    users() {
      const getuser = this.$store.getters["users/users"] || [];
      console.log("lấy user bên admin: ", getuser);
      return getuser;
    },
  },
  methods: {
    deleteUser(id) {
      console.log("Xóa user", id);
    },
    indexAccessor(_, data) {
      const index = this.users.indexOf(data);
      return (index + 1).toString();
    },
    actionBegin(args) {
      console.log("Action begin:", args.requestType);
    },
    actionComplete(args) {
      console.log("Action complete:", args.requestType);
    },
    excelExport() {
      this.$refs.grid.excelExport();
    },
  },
  mounted() {
    this.$store.dispatch("users/getUsers", {
      page: 1,
      limit: this.limit,
    });
  },
  provide: {
    grid: [Page, Sort, Edit, Toolbar, Group, ExcelExport],
  },
};
</script>
