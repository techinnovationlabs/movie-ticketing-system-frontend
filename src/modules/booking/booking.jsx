import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
	Steps,
	Button,
	message,
	DatePicker,
	Select,
	Row,
	Col,
	InputNumber,
	Typography,
} from "antd";
import { fetchMovieById } from "../movies/actions";
import { fetchShowsByDateAndMovie } from "../shows/actions";
import { KIDS_CONCESSION_PERCENTAGE } from "../../utils/constants";
import Title from "antd/lib/skeleton/Title";
const { Text } = Typography;
const { Option } = Select;
const { Step } = Steps;

const Booking = ({
	match,
	shows,
	movie,
	fetchShowsByDateAndMovie,
	fetchMovieById,
}) => {
	const [selectedDate, setSelectedDate] = useState();
	const [availableScreens, setAvailableScreens] = useState([]);
	const [selectedScreen, setSelectedScreen] = useState();
	const [availableSlots, setAvailableSlots] = useState([]);
	const [selectedSlot, setSelectedSlot] = useState();
	const [selectedSeats, setSelectedSeats] = useState({ adults: 0, kids: 0 });
	const [availableTiers, setAvailableTiers] = useState([]);
	const [selectedTier, setSelectedTier] = useState();
	const [show, setShow] = useState();
	const [totalPrice, setTotalPrice] = useState(0);
	const [allotedTickets, setAllotedTickets] = useState([]);

	const getAvailableScreens = () => {
		const availableScreens = [
			...new Map(
				shows.map((show) => [show["screen"]["_id"], show.screen])
			).values(),
		];
		setAvailableScreens([...availableScreens]);
	};

	const getAvailableSlots = () => {
		const filteredShows = shows?.filter(
			(show) => show.screen._id === selectedScreen
		);
		const availableSlots = [
			...new Map(
				filteredShows.map((show) => [
					show["showTime"]["_id"],
					show.showTime,
				])
			).values(),
		];

		setAvailableSlots([...availableSlots]);
	};

	const getAvailbleTiers = () => {
		const filteredShows = shows?.filter(
			(show) =>
				show.screen._id === selectedScreen &&
				show.showTime._id === selectedSlot
		);
		if (filteredShows.length === 0) {
			setAvailableTiers([]);
			setShow(null);
		} else {
			const seatCount = selectedSeats.adults + selectedSeats.kids;
			const show = filteredShows[0];
			setShow({ ...show });
			const availableTiers = show.availability.filter(
				(availtier) => availtier.availableSeats.length >= seatCount
			);
			setAvailableTiers([...availableTiers]);
		}
	};

	const getTicketsAndPrice = () => {
		let totalPrice = 0;
		const tier = show.availability.find(
			(tier) => tier._id === selectedTier
		);
		const seatCount = selectedSeats.adults + selectedSeats.kids;
		const adultsPrice = tier.price;
		const kidsPrice = tier.price - tier.price / KIDS_CONCESSION_PERCENTAGE;
		totalPrice =
			selectedSeats.adults * adultsPrice + selectedSeats.kids * kidsPrice;
		setAllotedTickets([...tier.availableSeats.slice(0, seatCount)]);
		setTotalPrice(totalPrice);
	};

	useEffect(() => {
		if (shows?.length) {
			getAvailableScreens(shows);
		}
	}, [shows]);

	const onDateChange = (val) => {
		setSelectedDate(val);
	};

	const onScreenChange = (val) => {
		setSelectedScreen(val);
	};

	const onSlotChange = (val) => {
		setSelectedSlot(val);
	};

	const onCountChange = (val, type) => {
		setSelectedSeats({ ...selectedSeats, [type]: val ? val : 0 });
	};

	const onTierChange = (val) => {
		setSelectedTier(val);
	};

	const getDate = () => {
		return <DatePicker value={selectedDate} onChange={onDateChange} />;
	};
	const getScreens = () => {
		return (
			<Select
				onChange={onScreenChange}
				value={selectedScreen}
				placeholder="Select a Screen"
				showSearch
				optionFilterProp="children"
				filterSort={(optionA, optionB) =>
					optionA.children
						.toLowerCase()
						.localeCompare(optionB.children.toLowerCase())
				}
			>
				{availableScreens.map((screen) => (
					<Option value={screen._id}>{screen.name}</Option>
				))}
			</Select>
		);
	};
	const getSlots = () => {
		return (
			<Select
				onChange={onSlotChange}
				value={selectedSlot}
				placeholder="Select a Showtime"
				showSearch
				optionFilterProp="children"
				filterSort={(optionA, optionB) =>
					optionA.children
						.toLowerCase()
						.localeCompare(optionB.children.toLowerCase())
				}
			>
				{availableSlots.map((slot) => (
					<Option value={slot._id}>{slot.slot}</Option>
				))}
			</Select>
		);
	};
	const getSeats = () => {
		return (
			<>
				<InputNumber
					placeholder="Adults count"
					value={selectedSeats.adults}
					min={0}
					max={10}
					onChange={(val) => onCountChange(val, "adults")}
				/>
				<InputNumber
					placeholder="Kids count"
					value={selectedSeats.kids}
					min={0}
					max={10}
					onChange={(val) => onCountChange(val, "kids")}
				/>
			</>
		);
	};
	const getTiers = () => {
		return (
			<Select
				onChange={onTierChange}
				value={selectedTier}
				placeholder="Select a Tier"
				showSearch
				optionFilterProp="children"
				filterSort={(optionA, optionB) =>
					optionA.children
						.toLowerCase()
						.localeCompare(optionB.children.toLowerCase())
				}
			>
				{availableTiers.map((tier) => (
					<Option value={tier._id}>{tier.name}</Option>
				))}
			</Select>
		);
	};
	const getSummary = () => {
		return (
			<>
				<Row>
					<Title>Booking Summary</Title>
				</Row>
				<Row>
					<Col className="doubleDot" span={11}>
						<Text> Date </Text>
					</Col>
					<Col className="popValue" span={13}>
						<Text>{selectedDate?.format("MM/DD/YYYY")} </Text>
					</Col>
				</Row>
				<Row>
					<Col className="doubleDot" span={11}>
						<Text> Adults </Text>
					</Col>
					<Col className="popValue" span={13}>
						<Text>{selectedSeats.adults} </Text>
					</Col>
				</Row>
				<Row>
					<Col className="doubleDot" span={11}>
						<Text> Kids </Text>
					</Col>
					<Col className="popValue" span={13}>
						<Text>{selectedSeats.kids} </Text>
					</Col>
				</Row>
				<Row>
					<Col className="doubleDot" span={11}>
						<Text> Ticket Nos </Text>
					</Col>
					<Col className="popValue" span={13}>
						<Text>{allotedTickets.join(",")} </Text>
					</Col>
				</Row>
				<Row>
					<Col className="doubleDot" span={11}>
						<Text> Total Price </Text>
					</Col>
					<Col className="popValue" span={13}>
						<Text>{totalPrice} </Text>
					</Col>
				</Row>
			</>
		);
	};
	const steps = [
		{
			title: "Select Date",
			content: getDate(),
		},
		{
			title: "Select Screen",
			content: getScreens(),
		},
		{
			title: "Select Time",
			content: getSlots(),
		},
		{
			title: "Select Seats",
			content: getSeats(),
		},
		{
			title: "Select Tier",
			content: getTiers(),
		},
		{
			title: "Summary",
			content: getSummary(),
		},
	];

	const [current, setCurrent] = useState(0);
	const [completed, setCompleted] = useState(false);

	const next = async () => {
		if (current === 0) {
			await fetchShowsByDateAndMovie(selectedDate, movie._id);
		} else if (current === 1) {
			getAvailableSlots();
		} else if (current === 2) {
		} else if (current === 3) {
			getAvailbleTiers();
		} else if (current === 4) {
			getTicketsAndPrice();
		}
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};
	useEffect(() => {
		fetchMovieById(match.params.id);
	}, [match.params.id]);

	return (
		<>
			<Steps current={current}>
				{steps.map((item) => (
					<Step key={item.title} title={item.title} />
				))}
			</Steps>
			<div className="steps-content">{steps[current].content}</div>
			<div className="steps-action">
				{current < steps.length - 1 && (
					<Button type="primary" onClick={() => next()}>
						Next
					</Button>
				)}
				{current === steps.length - 1 && (
					<Button
						type="primary"
						onClick={() => message.success("Processing complete!")}
					>
						Done
					</Button>
				)}
				{current > 0 && (
					<Button style={{ margin: "0 8px" }} onClick={() => prev()}>
						Previous
					</Button>
				)}
			</div>
		</>
	);
};

const mapStateToProps = ({ movieManagement, showManagement }) => ({
	movieLoading: movieManagement.loading,
	movie: movieManagement.selectedMovie,
	fetchErrorMsg: movieManagement.fetchErrorMessage,
	shows: showManagement.shows,
});
const mapDispatchToProps = {
	fetchMovieById,
	fetchShowsByDateAndMovie,
};
export default connect(mapStateToProps, mapDispatchToProps)(Booking);
