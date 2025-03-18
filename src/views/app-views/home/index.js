import { useCallback, useEffect, useState } from "react";

import { Button, Card, Table, Tooltip, message } from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AvatarStatus from "components/shared-components/AvatarStatus";
import { UserView } from "./UserView";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSetSelectedUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userProfileVisible, setUserProfileVisible] = useState(false);

  const showUserProfile = (userInfo) => {
    setUserProfileVisible(true);
    setSetSelectedUser(userInfo);
  };

  const closeUserProfile = () => {
    setUserProfileVisible(false);
    setSetSelectedUser(null);
  };

  const deleteUser = (userId) => {
    const users = this.state.users.filter((item) => item.id !== userId);
    setUsers(users);

    message.success({ content: `Deleted user ${userId}`, duration: 2 });
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => setUsers(json));
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setIsLoading(false), 3000);
    }
  }, [setIsLoading, setUsers]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const tableColumns = [
    {
      title: "User",
      dataIndex: "name",
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus name={record.name} subTitle={record.email} />
        </div>
      ),
      sorter: {
        compare: (a, b) => {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: "Adress",
      dataIndex: "adress",
      render: (address) => <p>{address?.city}</p>,
      sorter: {
        compare: (a, b) => a.address.length - b.address.length,
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (phone) => <span>{phone}</span>,
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: "Website",
      dataIndex: "website",
      render: (website) => <a href={website}>{website}</a>,
      sorter: {
        compare: (a, b) => {
          a = a.website.toLowerCase();
          b = b.website.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: "Company",
      dataIndex: "company",
      render: (company) => <span>{company.name}</span>,
      sorter: {
        compare: (a, b) => {
          a = a.company.name.toLowerCase();
          b = b.company.name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <Tooltip title="Edit">
            <Button
              type="primary"
              className="mr-2"
              icon={<EditOutlined />}
              onClick={() => {
                showUserProfile(elm);
              }}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => deleteUser(elm.id)}
              size="small"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Card bodyStyle={{ padding: "0px" }}>
      <Table
        columns={tableColumns}
        dataSource={users}
        loading={isLoading}
        pagination={false}
        rowKey="id"
      />
      <UserView
        data={selectedUser}
        visible={userProfileVisible}
        close={closeUserProfile}
      />
    </Card>
  );
};

export default Home;
