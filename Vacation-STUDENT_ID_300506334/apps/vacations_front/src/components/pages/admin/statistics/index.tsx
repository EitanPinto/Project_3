import { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { authState } from '../../../../store/reducers/authReducer';
import { VacationsState } from '../../../../store/reducers/vacationsReducer';
import { validateFrontTokenLogin } from '../../../../store/asyncFunctions/auth';
import { store } from '../../../../store';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../store/hooks';
import { getFollowersPerVacationAction } from '../../../../store/asyncFunctions/admin';
import { IFollowersPerVacationResponseObj } from '../../../../store/services/adminService';



export default function Stats (){
    
    const navigate = useNavigate()

    const vacationStats: Array<IFollowersPerVacationResponseObj> | [] = useAppSelector((state: {
        authorization: authState,
        vacations: VacationsState
      }) => state.vacations.vacationStats)

    const authState: authState = useAppSelector((state: {
        authorization: authState,
        vacations: VacationsState
      }) => state.authorization);
      const { isFrontTokenOkLogin, role} = authState
    
        useEffect(() => {
          const biggerFn = async () => {
          const placeHolderfn = async () => {
            await validateFrontTokenLogin()
            const state = store.getState()
            const localRole = state.authorization.role
            const localIsFrontTokenOkLogin = state.authorization.isFrontTokenOkLogin
          if(localIsFrontTokenOkLogin === false || localRole !== 'admin'){
          navigate("/login")
          }
        } 
        await placeHolderfn()
        await getFollowersPerVacationAction()
      }
        biggerFn()
    }, [role, isFrontTokenOkLogin]);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
      
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          }
        },
      };
      
    const labels = vacationStats.map((v)=> v.destination)
      
    const data = {
        labels,
        datasets: [
          {
            label: 'Showing the number of followers per vacation',
            data: vacationStats.map((v)=> v.number_of_followers),
            backgroundColor: '#ff1346',
          }
        ],
      };

    
    return <Bar style={{width: "60%", margin: "auto", marginTop:"100px"}} options={options} data={data} />;
}
