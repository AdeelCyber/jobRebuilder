import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Context from "../../Context/Context";
import CustomHeader from "../../Components/CustomHeader2";
import HeartIcon from "../../../assets/Svgs/HeartIcon";
import AIBrainIcon from "../../../assets/Svgs/AIBrainIcon";
import SoftwareCompanyIcon from "../../../assets/Svgs/SoftwareCompanyIcon";
import WhiteEye from "../../../assets/Svgs/WhiteEye";
import WhitePattern from "../../../assets/Svgs/WhitePattern";
import WhitePeople from "../../../assets/Svgs/WhitePeople";
import ConstructionIcon from "../../../assets/Svgs/ConstructionIcon";
import GraduationHat from "../../../assets/Svgs/GraduationHat";
import HomeCategories from "../../Components/CampaignCategory";
import background from "../../../assets/img/bg1.jpg";
import background2 from "../../../assets/img/bg2.png";
import MyText from "../../Components/Text";
import SvgImport from "../../Components/SvgImport";
import tick from "../../../assets/Svgs/Tick";
import { Feather } from "@expo/vector-icons";
import Pattern from "../../../assets/Svgs/WhitePattern";
import People from "../../../assets/Svgs/WhitePeople";
import TeamMemberCampaign from "../../Components/TeamMembersCampaign";
import TeamMemberWarning from "../../Components/TeamMemberWarning";
import { getStartupDetails } from "../Profile/services/FreeLancerServices";
import CartContext from "../../Context/CartProvider";

function TodoComponent({ Title, desc, ...props }) {
  const [select, setselected] = useState(true);

  const {
    theme: { colors },
  } = useContext(Context);

  return (
    <View
      style={[
        {
          width: "100%",
          backgroundColor: colors.white,
          paddingHorizontal: 8,
          paddingVertical: 14,
          borderRadius: 10,
          marginVertical: 8,
        },
        styles.shadow,
        { ...props.style },
      ]}
    >
      <View
        style={[
          {
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={() => setselected(!select)}>
            {select ? (
              <SvgImport svg={tick} />
            ) : (
              <Pressable
                style={{
                  backgroundColor: colors.white,
                  height: 17,
                  width: 17,
                  borderRadius: 20,
                  borderWidth: 1,
                }}
                onPress={() => setselected(!select)}
              ></Pressable>
            )}
          </Pressable>
          <MyText style={{ marginLeft: 10, fontSize: 14, fontWeight: "500" }}>
            {Title}
          </MyText>
        </View>
        {
          <Pressable onPress={() => setselected(!select)}>
            <Feather name="more-vertical" size={24} color="#A1A1A1" />
          </Pressable>
        }
      </View>
      <View style={{ marginLeft: 27.5, marginTop: 5, width: "85%" }}>
        <MyText
          style={{ color: colors.lighttext, fontSize: 11, fontWeight: "400" }}
        >
          {desc}
        </MyText>
        <View
          style={{
            flexDirection: "row",
            marginTop: 6,

            position: "relative",
            paddingBottom: 18,
          }}
        >
          {props.item.members.map((item, index) => {
            return (
              <Image
                source={{ uri: item.avatar }}
                style={{
                  width: 21,
                  height: 21,
                  borderRadius: 10,
                  zIndex: 1,
                  position: "absolute",
                  left: 0,
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

const ManagingCampaign = ({ navigation, route }) => {
  //fetch id params from previous screen into useState

  const [id, setid] = useState(route.params.id);
  // console.log(id);
  const [show, setshow] = useState(route.params.show);
  const contest = useContext(CartContext);
  // members array
  const TeamWarning = [
    {
      image: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
      Warnings: 2,
    },
    {
      image: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
      Warnings: 2,
    },
  ];
  // team members array
  const TeamMembers = [
    {
      image: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
      Warnings: 2,
    },
    {
      image: "https://bit.ly/kent-c-dodds",
      text: "Mike Dean",
      designation: "Ceo",
      Warnings: 2,
    },
  ];
  const [Todo, setTodo] = useState([
    {
      title: "Design UI for step ev",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem temporibus eos enim quo, modi iusto est saepe nesciunt rem nvoluptatibus illo, ad voluptatum eaque iste, ratione perferendis.",
    },
    {
      title: "Design UI for step ev",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem temporibus eos enim quo, modi iusto est saepe nesciunt rem nvoluptatibus illo, ad voluptatum eaque iste, ratione perferendis.",
    },
    {
      title: "Design UI for step ev",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem temporibus eos enim quo, modi iusto est saepe nesciunt rem nvoluptatibus illo, ad voluptatum eaque iste, ratione perferendis.",
    },
  ]);
  // upper categories
  const [catgeories, setCategories] = useState([
    {
      icon: WhiteEye,
      text: "Campaign",
      img: background,
      itemStyle: 20,
      navigation: "CampaignMenu",
    },
    {
      icon: Pattern,
      text: "MileStone",
      img: background,
      navigation: "MileStone",
    },
    {
      icon: People,
      text: "Our Team",
      img: background,
      itemStyle: 15,
      navigation: "Team",
    },
  ]);
  const {
    theme: { colors },
  } = useContext(Context);

  // api call
  const [data, setData] = useState("");
  const [Loaded, setLoaded] = useState(false);
  const [members, setmembers] = useState([]);
  useEffect(() => {
    const getFreelancersData = async () => {
      const resp = await getStartupDetails(id);

      // console.log(resp.data);
      if (resp.data.status === "OK") {
        console.log("done");

        setData(resp.data);
        // console.log(data.todos[0].todos);
        // console.log(resp.data.startup.milestones);
        contest.setmilestone(resp.data.startup.milestones);
        setLoaded(true);
      }
    };

    getFreelancersData();
  }, []);

  useEffect(() => {
    if (data) {
      if (data.todos !== undefined) {
        console.log(console.log(data.todos));
        setTodo(data.todos[0].todos);
      } else {
        setTodo([]);
        console.log("no todos");
      }
      setmembers(data.startup.members);
    }
  }, [data]);
  return (
    Loaded && (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
      >
        <CustomHeader
          Title="Beyond"
          style={{ elevation: 0 }}
          nav={navigation}
        />
        <View style={{ marginTop: 10 }}>
          <FlatList
            horizontal
            data={catgeories}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <HomeCategories
                svg={item.icon}
                title={item.text}
                navigation={navigation}
                screen={item.navigation}
                data={data}
                img={item.img}
                show={show}
                id={id}
                style={{
                  marginHorizontal: 10,
                  marginLeft: index == 0 ? 20 : 0,
                }}
                itemStyle={item.itemStyle}
              />
            )}
          />
        </View>
        <View style={{ paddingHorizontal: 23 }}>
          {/* header heading */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: 4,
              marginTop: 30,
            }}
          >
            <MyText style={{ fontSize: 24, fontWeight: "700" }}>To Do</MyText>
            <MyText
              style={{
                fontWeight: "500",
                fontSize: 10,
                color: colors.lighttext,
              }}
            >
              View more
            </MyText>
          </View>
          {/* Todo Component */}
          {Todo.map((item, index) => (
            <TodoComponent
              key={index}
              Title={item.title}
              desc={item.description}
              members={item.members}
              item={item}
            />
          ))}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: 4,
              marginTop: 30,
            }}
          >
            <MyText style={{ fontSize: 24, fontWeight: "700" }}>
              Team Members
            </MyText>
            <MyText
              style={{
                fontWeight: "500",
                fontSize: 10,
                color: colors.lighttext,
              }}
            >
              View more
            </MyText>
          </View>

          {members.map((item) => (
            <TeamMemberCampaign
              designation={item.position}
              image={item.member.avatar}
              text={item.member.name}
              style={{ marginVertical: 12 }}
            />
          ))}

          {show ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: 4,
                marginTop: 30,
              }}
            >
              <MyText style={{ fontSize: 24, fontWeight: "700" }}>
                Warnings
              </MyText>
              <Pressable
                onPress={() => navigation.navigate("TeamWarnings", { id: id })}
              >
                <MyText
                  style={{
                    fontWeight: "500",
                    fontSize: 10,
                    color: colors.lighttext,
                  }}
                >
                  View more
                </MyText>
              </Pressable>
            </View>
          ) : null}

          {show
            ? TeamWarning.map((item) => (
                <TeamMemberWarning
                  designation={item.designation}
                  image={item.image}
                  text={item.text}
                  Warnings={item.Warnings}
                  style={{ marginVertical: 12 }}
                />
              ))
            : null}
        </View>
      </ScrollView>
    )
  );
};

export default ManagingCampaign;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,

    elevation: 6,
  },
});
