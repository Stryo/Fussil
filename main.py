
import numpy as np
import pyvista as pv

# NumPy array with shape (n_points, 3)
points = np.genfromtxt('points_03.csv', delimiter=",", dtype=np.float32)
point_cloud = pv.PolyData(points)
point_cloud.plot(eye_dome_lighting=True)
mesh = point_cloud.reconstruct_surface()
mesh.plot(color='orange')
mesh.save('mesh.stl')
